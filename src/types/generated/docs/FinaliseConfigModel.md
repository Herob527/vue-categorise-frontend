# FinaliseConfigModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**omit_empty** | **boolean** |  | [optional] [default to true]
**line_format** | **string** |       supported keys:          {file} - file name          {category} - category name          {category_index} - category index (created automatically)          {text} - text of entry          {duration} - duration of audio in seconds       | [optional] [default to '{file}|{text}']
**divide_by_category** | **boolean** |  | [optional] [default to true]
**category_to_lower** | **boolean** |  | [optional] [default to false]
**category_space_replacer** | **string** |  | [optional] [default to ' ']
**export_transcript** | **boolean** |  | [optional] [default to true]
**uncaterized_name** | **string** |  | [optional] [default to 'Uncategorized']

## Example

```typescript
import { FinaliseConfigModel } from './api';

const instance: FinaliseConfigModel = {
    omit_empty,
    line_format,
    divide_by_category,
    category_to_lower,
    category_space_replacer,
    export_transcript,
    uncaterized_name,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
