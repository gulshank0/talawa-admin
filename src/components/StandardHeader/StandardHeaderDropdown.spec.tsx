import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StandardHeaderDropdown from './StandardHeaderDropdown';
import type { InterfaceSortingOption } from 'types/shared-components/SortingButton/interface';

let user: ReturnType<typeof userEvent.setup>;

beforeEach(() => {
  user = userEvent.setup({ delay: null });
});

/**
 * We mock the same DropDownButton that SortingButton delegates to so the
 * wrapper's CSS-class merging and prop forwarding can be verified without
 * pulling in the full Bootstrap Dropdown tree.
 */
vi.mock('shared-components/DropDownButton/DropDownButton', () => ({
  default: vi.fn((props) => {
    const {
      id,
      options,
      onSelect,
      ariaLabel,
      buttonLabel,
      icon,
      parentContainerStyle,
      dataTestIdPrefix,
      containerClassName,
      toggleClassName,
    } = props;

    return (
      <div
        id={id}
        data-testid={`${dataTestIdPrefix}-container`}
        className={`${parentContainerStyle ?? ''} ${containerClassName ?? ''}`.trim()}
      >
        <button
          type="button"
          data-testid={`${dataTestIdPrefix}-toggle`}
          aria-label={ariaLabel}
          className={toggleClassName}
        >
          {icon}
          {buttonLabel}
        </button>

        <div data-testid={`${dataTestIdPrefix}-menu`} role="listbox">
          {options.map((option: { label: string; value: string }) => (
            <button
              type="button"
              key={option.value}
              data-testid={option.value}
              role="option"
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }),
}));

describe('StandardHeaderDropdown', () => {
  const mockSortingOptions: InterfaceSortingOption[] = [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Most Popular', value: 1 },
    { label: 'Least Popular', value: 2 },
  ];

  const defaultProps = {
    sortingOptions: mockSortingOptions,
    selectedOption: 'latest' as string | number,
    onSortChange: vi.fn(),
    dataTestIdPrefix: 'header-sort',
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders the outer wrapper element', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      expect(
        screen.getByTestId('standard-header-dropdown-wrapper'),
      ).toBeInTheDocument();
    });

    it('renders the SortingButton toggle inside the wrapper', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('header-sort-toggle')).toBeInTheDocument();
    });

    it('displays the selected option as the button label by default', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent(
        'latest',
      );
    });

    it('displays a custom buttonLabel when provided', () => {
      render(
        <StandardHeaderDropdown {...defaultProps} buttonLabel="Sort By" />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent(
        'Sort By',
      );
    });

    it('renders the sort icon by default', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      const icon = screen.getByTestId('sorting-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-icon-type', 'sort');
    });

    it('renders the filter icon when type is "filter"', () => {
      render(<StandardHeaderDropdown {...defaultProps} type="filter" />);
      const icon = screen.getByTestId('sorting-icon');
      expect(icon).toHaveAttribute('data-icon-type', 'filter');
    });
  });

  // ── CSS class merging ──────────────────────────────────────

  describe('CSS class merging', () => {
    it('applies default wrapper class when no wrapperClassName is given', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      const wrapper = screen.getByTestId('standard-header-dropdown-wrapper');
      expect(wrapper.className).not.toBe('');
    });

    it('appends wrapperClassName to wrapper when provided', () => {
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          wrapperClassName="extra-wrapper"
        />,
      );
      const wrapper = screen.getByTestId('standard-header-dropdown-wrapper');
      expect(wrapper.className).toContain('extra-wrapper');
    });

    it('merges containerClassName from caller with standard styles', () => {
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          containerClassName="custom-container"
        />,
      );
      const container = screen.getByTestId('header-sort-container');
      expect(container.className).toContain('custom-container');
    });

    it('merges toggleClassName from caller with standard styles', () => {
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          toggleClassName="custom-toggle"
        />,
      );
      const toggle = screen.getByTestId('header-sort-toggle');
      expect(toggle.className).toContain('custom-toggle');
    });

    it('applies standard container class even without consumer override', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      const container = screen.getByTestId('header-sort-container');
      // Should still have the standard class (CSS module hash)
      expect(container.className.length).toBeGreaterThan(0);
    });

    it('applies standard toggle class even without consumer override', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      const toggle = screen.getByTestId('header-sort-toggle');
      expect(toggle.className.length).toBeGreaterThan(0);
    });
  });

  // ── Accessibility ──────────────────────────────────────────

  describe('Accessibility', () => {
    it('forwards ariaLabel to the toggle button', () => {
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          ariaLabel="Sort members list"
        />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toHaveAttribute(
        'aria-label',
        'Sort members list',
      );
    });

    it('falls back to title for aria-label when ariaLabel is omitted', () => {
      render(<StandardHeaderDropdown {...defaultProps} title="Sort Options" />);
      expect(screen.getByTestId('header-sort-toggle')).toHaveAttribute(
        'aria-label',
        'Sort Options',
      );
    });

    it('marks icons as aria-hidden', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('sorting-icon')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });
  });

  // ── Dropdown functionality ─────────────────────────────────

  describe('Dropdown functionality', () => {
    it('renders all sorting options in the menu', () => {
      render(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('latest')).toBeInTheDocument();
      expect(screen.getByTestId('oldest')).toBeInTheDocument();
      expect(screen.getByTestId('1')).toBeInTheDocument();
      expect(screen.getByTestId('2')).toBeInTheDocument();
    });

    it('calls onSortChange with the string value when an option is clicked', async () => {
      const onSortChange = vi.fn();
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          onSortChange={onSortChange}
        />,
      );
      await user.click(screen.getByTestId('oldest'));
      expect(onSortChange).toHaveBeenCalledOnce();
      expect(onSortChange).toHaveBeenCalledWith('oldest');
    });

    it('calls onSortChange with stringified number value for numeric options', async () => {
      const onSortChange = vi.fn();
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          onSortChange={onSortChange}
        />,
      );
      await user.click(screen.getByTestId('1'));
      expect(onSortChange).toHaveBeenCalledWith('1');
    });
  });

  // ── Prop forwarding ────────────────────────────────────────

  describe('Prop forwarding', () => {
    it('forwards dropdownTestId to the inner dropdown', () => {
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          dropdownTestId="my-dropdown"
        />,
      );
      const container = screen.getByTestId('header-sort-container');
      expect(container).toHaveAttribute('id', 'my-dropdown');
    });

    it('forwards a custom icon prop to SortingButton', () => {
      render(
        <StandardHeaderDropdown {...defaultProps} icon="/icons/custom.svg" />,
      );
      const img = screen.getByRole('img', { hidden: true });
      expect(img).toHaveAttribute('src', '/icons/custom.svg');
      expect(screen.queryByTestId('sorting-icon')).not.toBeInTheDocument();
    });

    it('forwards className prop to SortingButton', () => {
      render(<StandardHeaderDropdown {...defaultProps} className="my-class" />);
      const container = screen.getByTestId('header-sort-container');
      expect(container.className).toContain('my-class');
    });
  });

  // ── Edge cases ─────────────────────────────────────────────

  describe('Edge cases', () => {
    it('renders with an empty sortingOptions array without crashing', () => {
      render(<StandardHeaderDropdown {...defaultProps} sortingOptions={[]} />);
      expect(
        screen.getByTestId('standard-header-dropdown-wrapper'),
      ).toBeInTheDocument();
    });

    it('handles undefined selectedOption gracefully', () => {
      render(
        <StandardHeaderDropdown {...defaultProps} selectedOption={undefined} />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toBeInTheDocument();
    });

    it('handles numeric selectedOption', () => {
      render(<StandardHeaderDropdown {...defaultProps} selectedOption={1} />);
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent('1');
    });

    it('handles selectedOption not matching any option value', () => {
      render(
        <StandardHeaderDropdown
          {...defaultProps}
          selectedOption="non-existent"
        />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent(
        'non-existent',
      );
    });
  });
});
