import type { InterfaceSortingButtonProps } from 'types/shared-components/SortingButton/interface';

/**
 * Props for the StandardHeaderDropdown component.
 *
 * Extends every prop that SortingButton accepts and adds an optional
 * `wrapperClassName` for page-level layout overrides.
 */
export interface InterfaceStandardHeaderDropdownProps extends InterfaceSortingButtonProps {
  /**
   * Optional extra class name applied to the outermost wrapper element.
   * Use this to add page-specific layout adjustments (e.g. margins)
   * without overriding the shared standardized styles.
   */
  wrapperClassName?: string;
}
