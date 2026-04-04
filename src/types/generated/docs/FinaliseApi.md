# FinaliseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**downloadFinalizedZipFinaliseDownloadZipGet**](#downloadfinalizedzipfinalisedownloadzipget) | **GET** /finalise/download/zip | Download Finalized Zip|
|[**generatePreviewFinaliseGeneratePreviewPost**](#generatepreviewfinalisegeneratepreviewpost) | **POST** /finalise/generate_preview | Generate Preview|
|[**getStatusesFinaliseStatusGet**](#getstatusesfinalisestatusget) | **GET** /finalise/status | Get Statuses|
|[**scheduleFinaliseFinaliseSchedulePost**](#schedulefinalisefinaliseschedulepost) | **POST** /finalise/schedule | Schedule Finalise|

# **downloadFinalizedZipFinaliseDownloadZipGet**
> string downloadFinalizedZipFinaliseDownloadZipGet()

Downloads all finalized files from the temp directory as a zip file.

### Example

```typescript
import {
    FinaliseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

const { status, data } = await apiInstance.downloadFinalizedZipFinaliseDownloadZipGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**string**

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
> any getStatusesFinaliseStatusGet()


### Example

```typescript
import {
    FinaliseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

const { status, data } = await apiInstance.getStatusesFinaliseStatusGet();
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

# **scheduleFinaliseFinaliseSchedulePost**
> any scheduleFinaliseFinaliseSchedulePost()


### Example

```typescript
import {
    FinaliseApi,
    Configuration,
    ScheduleData
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let scheduleData: ScheduleData; // (optional)

const { status, data } = await apiInstance.scheduleFinaliseFinaliseSchedulePost(
    scheduleData
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **scheduleData** | **ScheduleData**|  | |


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

