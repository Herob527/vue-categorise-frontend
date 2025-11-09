# BindingsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**bindingCategoryRemoveBindingsBindingIdRemoveCategoryPut**](#bindingcategoryremovebindingsbindingidremovecategoryput) | **PUT** /bindings/{binding_id}/remove_category | Binding Category Remove|
|[**bindingCategoryUpdateBindingsBindingIdCategoryAssignCategoryIdPut**](#bindingcategoryupdatebindingsbindingidcategoryassigncategoryidput) | **PUT** /bindings/{binding_id}/category_assign/{category_id} | Binding Category Update|
|[**createBindingBindingsPost**](#createbindingbindingspost) | **POST** /bindings | Create Binding|
|[**getAllBindingsBindingsAllGet**](#getallbindingsbindingsallget) | **GET** /bindings/all | Get All Bindings|
|[**getCountBindingsCountGet**](#getcountbindingscountget) | **GET** /bindings/count | Get Count|
|[**getPaginatedBindingsBindingsGet**](#getpaginatedbindingsbindingsget) | **GET** /bindings | Get Paginated Bindings|
|[**removeBindingBindingsBindingIdDelete**](#removebindingbindingsbindingiddelete) | **DELETE** /bindings/{binding_id} | Remove Binding|

# **bindingCategoryRemoveBindingsBindingIdRemoveCategoryPut**
> any bindingCategoryRemoveBindingsBindingIdRemoveCategoryPut()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

let bindingId: string; // (default to undefined)

const { status, data } = await apiInstance.bindingCategoryRemoveBindingsBindingIdRemoveCategoryPut(
    bindingId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bindingId** | [**string**] |  | defaults to undefined|


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

# **bindingCategoryUpdateBindingsBindingIdCategoryAssignCategoryIdPut**
> any bindingCategoryUpdateBindingsBindingIdCategoryAssignCategoryIdPut()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

let bindingId: string; // (default to undefined)
let categoryId: string; // (default to undefined)

const { status, data } = await apiInstance.bindingCategoryUpdateBindingsBindingIdCategoryAssignCategoryIdPut(
    bindingId,
    categoryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bindingId** | [**string**] |  | defaults to undefined|
| **categoryId** | [**string**] |  | defaults to undefined|


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

# **createBindingBindingsPost**
> CreateResponseModel createBindingBindingsPost()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

let audio: File; // (default to undefined)
let category: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.createBindingBindingsPost(
    audio,
    category
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **audio** | [**File**] |  | defaults to undefined|
| **category** | [**string**] |  | (optional) defaults to undefined|


### Return type

**CreateResponseModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | Not found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllBindingsBindingsAllGet**
> Array<BindingModel> getAllBindingsBindingsAllGet()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

let category: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getAllBindingsBindingsAllGet(
    category
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **category** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<BindingModel>**

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

# **getCountBindingsCountGet**
> any getCountBindingsCountGet()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

const { status, data } = await apiInstance.getCountBindingsCountGet();
```

### Parameters
This endpoint does not have any parameters.


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPaginatedBindingsBindingsGet**
> PaginatedBindingModel getPaginatedBindingsBindingsGet()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

let page: number; // (optional) (default to 0)
let perPage: number; // (optional) (default to 10)

const { status, data } = await apiInstance.getPaginatedBindingsBindingsGet(
    page,
    perPage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **perPage** | [**number**] |  | (optional) defaults to 10|


### Return type

**PaginatedBindingModel**

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

# **removeBindingBindingsBindingIdDelete**
> any removeBindingBindingsBindingIdDelete()


### Example

```typescript
import {
    BindingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new BindingsApi(configuration);

let bindingId: string; // (default to undefined)

const { status, data } = await apiInstance.removeBindingBindingsBindingIdDelete(
    bindingId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bindingId** | [**string**] |  | defaults to undefined|


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

