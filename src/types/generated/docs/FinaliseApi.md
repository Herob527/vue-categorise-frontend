# FinaliseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteFinalizedZipFinaliseDeleteZipExportIdGet**](#deletefinalizedzipfinalisedeletezipexportidget) | **GET** /finalise/delete-zip/{export_id} | Delete Finalized Zip|
|[**downloadFinalizedZipFinaliseDownloadExportIdGet**](#downloadfinalizedzipfinalisedownloadexportidget) | **GET** /finalise/download/{export_id} | Download Finalized Zip|
|[**generatePreviewFinaliseGeneratePreviewPost**](#generatepreviewfinalisegeneratepreviewpost) | **POST** /finalise/generate_preview | Generate Preview|
|[**getStatusesFinaliseStatusGet**](#getstatusesfinalisestatusget) | **GET** /finalise/status | Get Statuses|
|[**scheduleFinaliseFinaliseSchedulePost**](#schedulefinalisefinaliseschedulepost) | **POST** /finalise/schedule | Schedule Finalise|

# **deleteFinalizedZipFinaliseDeleteZipExportIdGet**
> any deleteFinalizedZipFinaliseDeleteZipExportIdGet()


### Example

```typescript
import {
    FinaliseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let exportId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteFinalizedZipFinaliseDeleteZipExportIdGet(
    exportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **exportId** | [**string**] |  | defaults to undefined|


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

# **downloadFinalizedZipFinaliseDownloadExportIdGet**
> any downloadFinalizedZipFinaliseDownloadExportIdGet()


### Example

```typescript
import {
    FinaliseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let exportId: string; // (default to undefined)

const { status, data } = await apiInstance.downloadFinalizedZipFinaliseDownloadExportIdGet(
    exportId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **exportId** | [**string**] |  | defaults to undefined|


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

# **generatePreviewFinaliseGeneratePreviewPost**
> DirectoryModel generatePreviewFinaliseGeneratePreviewPost(finaliseConfigModel)


### Example

```typescript
import {
    FinaliseApi,
    Configuration,
    FinaliseConfigModel
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let finaliseConfigModel: FinaliseConfigModel; //

const { status, data } = await apiInstance.generatePreviewFinaliseGeneratePreviewPost(
    finaliseConfigModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **finaliseConfigModel** | **FinaliseConfigModel**|  | |


### Return type

**DirectoryModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | Not found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStatusesFinaliseStatusGet**
> PaginatedExportModel getStatusesFinaliseStatusGet()


### Example

```typescript
import {
    FinaliseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let page: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getStatusesFinaliseStatusGet(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 20|


### Return type

**PaginatedExportModel**

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

# **scheduleFinaliseFinaliseSchedulePost**
> any scheduleFinaliseFinaliseSchedulePost(bodyScheduleFinaliseFinaliseSchedulePost)


### Example

```typescript
import {
    FinaliseApi,
    Configuration,
    BodyScheduleFinaliseFinaliseSchedulePost
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let bodyScheduleFinaliseFinaliseSchedulePost: BodyScheduleFinaliseFinaliseSchedulePost; //

const { status, data } = await apiInstance.scheduleFinaliseFinaliseSchedulePost(
    bodyScheduleFinaliseFinaliseSchedulePost
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bodyScheduleFinaliseFinaliseSchedulePost** | **BodyScheduleFinaliseFinaliseSchedulePost**|  | |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**404** | Not found |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

