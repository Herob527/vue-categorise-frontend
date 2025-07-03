# TextsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**updateTextTextsTextIdPatch**](#updatetexttextstextidpatch) | **PATCH** /texts/{text_id} | Update Text|

# **updateTextTextsTextIdPatch**
> any updateTextTextsTextIdPatch()


### Example

```typescript
import {
    TextsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TextsApi(configuration);

let textId: string; // (default to undefined)
let newText: string; // (default to undefined)

const { status, data } = await apiInstance.updateTextTextsTextIdPatch(
    textId,
    newText
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **textId** | [**string**] |  | defaults to undefined|
| **newText** | [**string**] |  | defaults to undefined|


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | Not found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

