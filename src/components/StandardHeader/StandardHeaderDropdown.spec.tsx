import React from 'react';
import type { ReactElement } from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18nForTest from 'utils/i18nForTest';
import StandardHeaderDropdown from './StandardHeaderDropdown';
import type { InterfaceSortingOption } from 'types/shared-components/SortingButton/interface';

const renderWithProviders = (ui: ReactElement) =>
  render(<I18nextProvider i18n={i18nForTest}>{ui}</I18nextProvider>);

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
      disabled,
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
          disabled={disabled}
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
              disabled={disabled}
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

  // ── Rendering ────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders the outer wrapper element', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      expect(
        screen.getByTestId('standard-header-dropdown-wrapper'),
      ).toBeInTheDocument();
    });

    it('renders the SortingButton toggle inside the wrapper', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('header-sort-toggle')).toBeInTheDocument();
    });

    it('displays the selected option as the button label by default', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent(
        'latest',
      );
    });

    it('displays a custom buttonLabel when provided', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} buttonLabel="Sort By" />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent(
        'Sort By',
      );
    });

    it('renders the sort icon by default', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      const icon = screen.getByTestId('sorting-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-icon-type', 'sort');
    });

    it('renders the filter icon when type is "filter"', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} type="filter" />,
      );
      const icon = screen.getByTestId('sorting-icon');
      expect(icon).toHaveAttribute('data-icon-type', 'filter');
    });
  });

  // ── CSS class merging ──────────────────────────────────────

  describe('CSS class merging', () => {
    it('applies default wrapper class when no wrapperClassName is given', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      const wrapper = screen.getByTestId('standard-header-dropdown-wrapper');
      expect(wrapper.className).not.toBe('');
    });

    it('appends wrapperClassName to wrapper when provided', () => {
      renderWithProviders(
        <StandardHeaderDropdown
          {...defaultProps}
          wrapperClassName="extra-wrapper"
        />,
      );
      const wrapper = screen.getByTestId('standard-header-dropdown-wrapper');
      expect(wrapper.className).toContain('extra-wrapper');
    });

    it('merges containerClassName from caller with standard styles', () => {
      renderWithProviders(
        <StandardHeaderDropdown
          {...defaultProps}
          containerClassName="custom-container"
        />,
      );
      const container = screen.getByTestId('header-sort-container');
      expect(container.className).toContain('custom-container');
    });

    it('merges toggleClassName from caller with standard styles', () => {
      renderWithProviders(
        <StandardHeaderDropdown
          {...defaultProps}
          toggleClassName="custom-toggle"
        />,
      );
      const toggle = screen.getByTestId('header-sort-toggle');
      expect(toggle.className).toContain('custom-toggle');
    });

    it('applies standard container class even without consumer override', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      const container = screen.getByTestId('header-sort-container');
      // Should still have the standard class (CSS module hash)
      expect(container.className.length).toBeGreaterThan(0);
    });

    it('applies standard toggle class even without consumer override', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      const toggle = screen.getByTestId('header-sort-toggle');
      expect(toggle.className.length).toBeGreaterThan(0);
    });
  });

  // ── Accessibility ──────────────────────────────────────────

  describe('Accessibility', () => {
    it('forwards ariaLabel to the toggle button', () => {
      renderWithProviders(
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
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} title="Sort Options" />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toHaveAttribute(
        'aria-label',
        'Sort Options',
      );
    });

    it('marks icons as aria-hidden', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('sorting-icon')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });
  });

  // ── Dropdown functionality ─────────────────────────────────

  describe('Dropdown functionality', () => {
    it('renders all sorting options in the menu', () => {
      renderWithProviders(<StandardHeaderDropdown {...defaultProps} />);
      expect(screen.getByTestId('latest')).toBeInTheDocument();
      expect(screen.getByTestId('oldest')).toBeInTheDocument();
      expect(screen.getByTestId('1')).toBeInTheDocument();
      expect(screen.getByTestId('2')).toBeInTheDocument();
    });

    it('calls onSortChange with the string value when an option is clicked', async () => {
      const onSortChange = vi.fn();
      renderWithProviders(
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
      renderWithProviders(
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
      renderWithProviders(
        <StandardHeaderDropdown
          {...defaultProps}
          dropdownTestId="my-dropdown"
        />,
      );
      const container = screen.getByTestId('header-sort-container');
      expect(container).toHaveAttribute('id', 'my-dropdown');
    });

    it('forwards a custom icon prop to SortingButton', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} icon="/icons/custom.svg" />,
      );
      const img = screen.getByRole('img', { hidden: true });
      expect(img).toHaveAttribute('src', '/icons/custom.svg');
      expect(screen.queryByTestId('sorting-icon')).not.toBeInTheDocument();
    });

    it('forwards className prop to SortingButton', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} className="my-class" />,
      );
      const container = screen.getByTestId('header-sort-container');
      expect(container.className).toContain('my-class');
    });

    it('forwards disabled prop to the toggle button', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} disabled={true} />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toBeDisabled();
    });
  });

  // ── Disabled state ─────────────────────────────────────────

  describe('Disabled state', () => {
    it('toggle button is disabled when disabled prop is true', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} disabled={true} />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toBeDisabled();
    });

    it('does not call onSortChange when an option is clicked while disabled', async () => {
      const onSortChange = vi.fn();
      renderWithProviders(
        <StandardHeaderDropdown
          {...defaultProps}
          onSortChange={onSortChange}
          disabled={true}
        />,
      );
      await user.click(screen.getByTestId('oldest'));
      expect(onSortChange).not.toHaveBeenCalled();
    });

    it('ARIA: disabled toggle retains its aria-label and has disabled attribute', () => {
      renderWithProviders(
        <StandardHeaderDropdown
          {...defaultProps}
          disabled={true}
          ariaLabel="Sort members list"
        />,
      );
      const toggle = screen.getByTestId('header-sort-toggle');
      expect(toggle).toBeDisabled();
      expect(toggle).toHaveAttribute('aria-label', 'Sort members list');
    });
  });

  // ── Edge cases ─────────────────────────────────────────────

  describe('Edge cases', () => {
    it('renders with an empty sortingOptions array without crashing', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} sortingOptions={[]} />,
      );
      expect(
        screen.getByTestId('standard-header-dropdown-wrapper'),
      ).toBeInTheDocument();
    });

    it('handles undefined selectedOption gracefully', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} selectedOption={undefined} />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toBeInTheDocument();
    });

    it('handles numeric selectedOption', () => {
      renderWithProviders(
        <StandardHeaderDropdown {...defaultProps} selectedOption={1} />,
      );
      expect(screen.getByTestId('header-sort-toggle')).toHaveTextContent('1');
    });

    it('handles selectedOption not matching any option value', () => {
      renderWithProviders(
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
