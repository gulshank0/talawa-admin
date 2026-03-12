[Admin Docs](/)

***

# Interface: InterfaceStandardHeaderDropdownProps

Defined in: [src/types/components/StandardHeader/interface.ts:9](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/components/StandardHeader/interface.ts#L9)

Props for the StandardHeaderDropdown component.

Extends every prop that SortingButton accepts and adds an optional
`wrapperClassName` for page-level layout overrides.

## Extends

- [`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md)

## Properties

### ariaLabel?

> `optional` **ariaLabel**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:34](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L34)

Accessible label for the dropdown button (screen readers)

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`ariaLabel`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#arialabel)

***

### buttonLabel?

> `optional` **buttonLabel**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:30](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L30)

Optional prop for custom button label

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`buttonLabel`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#buttonlabel)

***

### className?

> `optional` **className**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:28](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L28)

Custom class name for the Dropdown

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`className`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#classname)

***

### containerClassName?

> `optional` **containerClassName**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:38](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L38)

Optional extra class for the dropdown container (e.g. from parent CSS module)

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`containerClassName`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#containerclassname)

***

### dataTestIdPrefix

> **dataTestIdPrefix**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:24](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L24)

The prefix for data-testid attributes for testing

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`dataTestIdPrefix`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#datatestidprefix)

***

### dropdownTestId?

> `optional` **dropdownTestId**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:26](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L26)

The data-testid attribute for the Dropdown

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`dropdownTestId`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#dropdowntestid)

***

### icon?

> `optional` **icon**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:36](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L36)

Optional custom icon to display in the button

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`icon`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#icon)

***

### onSortChange()

> **onSortChange**: (`value`) => `void`

Defined in: [src/types/shared-components/SortingButton/interface.ts:22](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L22)

Callback function to handle sorting option change

#### Parameters

##### value

`string` | `number`

#### Returns

`void`

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`onSortChange`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#onsortchange)

***

### selectedOption?

> `optional` **selectedOption**: `string` \| `number`

Defined in: [src/types/shared-components/SortingButton/interface.ts:20](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L20)

The currently selected sorting option

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`selectedOption`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#selectedoption)

***

### sortingOptions

> **sortingOptions**: [`InterfaceSortingOption`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingOption.md)[]

Defined in: [src/types/shared-components/SortingButton/interface.ts:18](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L18)

The list of sorting options to display in the Dropdown

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`sortingOptions`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#sortingoptions)

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:16](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L16)

The title attribute for the Dropdown

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`title`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#title)

***

### toggleClassName?

> `optional` **toggleClassName**: `string`

Defined in: [src/types/shared-components/SortingButton/interface.ts:40](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L40)

Optional extra class for the toggle button (e.g. from parent CSS module)

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`toggleClassName`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#toggleclassname)

***

### type?

> `optional` **type**: `"filter"` \| `"sort"`

Defined in: [src/types/shared-components/SortingButton/interface.ts:32](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/shared-components/SortingButton/interface.ts#L32)

Type to determine the icon to display: 'sort' or 'filter'

#### Inherited from

[`InterfaceSortingButtonProps`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md).[`type`](../../../../shared-components/SortingButton/interface/interfaces/InterfaceSortingButtonProps.md#type)

***

### wrapperClassName?

> `optional` **wrapperClassName**: `string`

Defined in: [src/types/components/StandardHeader/interface.ts:15](https://github.com/PalisadoesFoundation/talawa-admin/blob/main/src/types/components/StandardHeader/interface.ts#L15)

Optional extra class name applied to the outermost wrapper element.
Use this to add page-specific layout adjustments (e.g. margins)
without overriding the shared standardized styles.
