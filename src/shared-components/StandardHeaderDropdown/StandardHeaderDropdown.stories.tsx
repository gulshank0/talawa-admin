import type { Meta, StoryObj } from '@storybook/react';
import StandardHeaderDropdown from './StandardHeaderDropdown';

const meta: Meta<typeof StandardHeaderDropdown> = {
  title: 'Components/StandardHeader/StandardHeaderDropdown',
  component: StandardHeaderDropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A standardized wrapper around SortingButton that provides consistent ' +
          'dropdown styling (hover, focus, active states, spacing, and icon alignment) ' +
          'across all screen headers. Part of the header standardization effort (issue 7424).',
      },
    },
  },
  argTypes: {
    type: {
      description: 'Controls the icon shown in the button: sort or filter.',
      control: 'radio',
      options: ['sort', 'filter'],
    },
    buttonLabel: {
      description: 'Custom label text displayed on the toggle button.',
      control: 'text',
    },
    ariaLabel: {
      description: 'Accessible label for screen readers.',
      control: 'text',
    },
    selectedOption: {
      description: 'The currently selected option value.',
      control: 'text',
    },
    wrapperClassName: {
      description:
        'Extra class name applied to the outermost wrapper for page-specific layout.',
      control: 'text',
    },
    onSortChange: { action: 'onSortChange' },
  },
};

export default meta;

type Story = StoryObj<typeof StandardHeaderDropdown>;

// i18n-ignore-next-line
const SORT_OPTIONS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A → Z', value: 'az' },
  { label: 'Z → A', value: 'za' },
];

// i18n-ignore-next-line
const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

/**
 * Default sort dropdown as used in most list headers.
 */
export const SortDropdown: Story = {
  args: {
    type: 'sort',
    dataTestIdPrefix: 'story-sort',
    sortingOptions: SORT_OPTIONS,
    selectedOption: 'latest',
    buttonLabel: 'Sort',
    ariaLabel: 'Sort items',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sort dropdown with the default sort icon and four options.',
      },
    },
  },
};

/**
 * Filter dropdown using the filter icon variant.
 */
export const FilterDropdown: Story = {
  args: {
    type: 'filter',
    dataTestIdPrefix: 'story-filter',
    sortingOptions: FILTER_OPTIONS,
    selectedOption: 'all',
    buttonLabel: 'Filter',
    ariaLabel: 'Filter items by status',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter dropdown using the FilterAltOutlined icon.',
      },
    },
  },
};

/**
 * Dropdown showing the selected value as the button label.
 */
export const SelectedValueAsLabel: Story = {
  args: {
    type: 'sort',
    dataTestIdPrefix: 'story-value-label',
    sortingOptions: SORT_OPTIONS,
    selectedOption: 'az',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When no explicit buttonLabel is provided, the selected option value is shown on the toggle.',
      },
    },
  },
};

/**
 * No option selected yet — shows an empty toggle label.
 */
export const NoSelection: Story = {
  args: {
    type: 'sort',
    dataTestIdPrefix: 'story-empty',
    sortingOptions: SORT_OPTIONS,
    selectedOption: undefined,
    buttonLabel: 'Choose…',
    ariaLabel: 'Choose an option',
  },
  parameters: {
    docs: {
      description: {
        story: 'Placeholder state before any selection is made.',
      },
    },
  },
};

/**
 * Demonstrating the optional `wrapperClassName` for page-specific overrides.
 */
export const WithCustomWrapperClass: Story = {
  args: {
    type: 'sort',
    dataTestIdPrefix: 'story-custom',
    sortingOptions: SORT_OPTIONS,
    selectedOption: 'latest',
    buttonLabel: 'Sort',
    ariaLabel: 'Sort items',
    wrapperClassName: 'my-custom-wrapper',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An extra `wrapperClassName` is merged so parent pages can add margins or flex alignment.',
      },
    },
  },
};

/**
 * With a custom icon image instead of the default MUI icon.
 */
export const CustomIconImage: Story = {
  args: {
    type: 'sort',
    dataTestIdPrefix: 'story-icon',
    sortingOptions: SORT_OPTIONS,
    selectedOption: 'latest',
    buttonLabel: 'Sort',
    icon: 'https://api.iconify.design/mdi:sort-variant.svg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Providing an `icon` prop replaces the MUI icon with a custom `<img>`.',
      },
    },
  },
};

/**
 * Disabled state where the toggle button cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    type: 'sort',
    dataTestIdPrefix: 'story-disabled',
    sortingOptions: SORT_OPTIONS,
    selectedOption: 'latest',
    buttonLabel: 'Sort',
    ariaLabel: 'Sort items (disabled)',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown is rendered in a disabled state. The toggle button cannot be clicked to open the menu.',
      },
    },
  },
};
