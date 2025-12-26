# PaginationModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | **number** |  | [default to undefined]
**current_page** | **number** |  | [default to undefined]
**total_pages** | **number** |  | [default to undefined]
**per_page** | **number** |  | [default to undefined]
**has_next** | **boolean** |  | [default to undefined]
**has_previous** | **boolean** |  | [default to undefined]
**next_page** | **number** |  | [optional] [default to undefined]
**previous_page** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { PaginationModel } from './api';

const instance: PaginationModel = {
    total,
    current_page,
    total_pages,
    per_page,
    has_next,
    has_previous,
    next_page,
    previous_page,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
