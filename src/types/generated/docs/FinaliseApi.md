# FinaliseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**downloadFinalizedZipFinaliseDownloadZipGet**](#downloadfinalizedzipfinalisedownloadzipget) | **GET** /finalise/download/zip | Download Finalized Zip|
|[**finaliseFinalisePost**](#finalisefinalisepost) | **POST** /finalise/ | Finalise|
|[**getDirFinaliseObjectIdGet**](#getdirfinaliseobjectidget) | **GET** /finalise/{object_id} | Get Dir|

# **downloadFinalizedZipFinaliseDownloadZipGet**
> any downloadFinalizedZipFinaliseDownloadZipGet()

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

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/zip


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns a zip file containing all finalized files |  -  |
|**404** | No finalized files found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **finaliseFinalisePost**
> DirectoryModel finaliseFinalisePost(finaliseConfigModel)


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

const { status, data } = await apiInstance.finaliseFinalisePost(
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

# **getDirFinaliseObjectIdGet**
> string getDirFinaliseObjectIdGet()


### Example

```typescript
import {
    FinaliseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FinaliseApi(configuration);

let objectId: string; // (default to undefined)

const { status, data } = await apiInstance.getDirFinaliseObjectIdGet(
    objectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **objectId** | [**string**] |  | defaults to undefined|


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
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

