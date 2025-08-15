# AudioApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteAudioAudioAudioIdDelete**](#deleteaudioaudioaudioiddelete) | **DELETE** /audio/{audio_id} | Delete Audio|
|[**downloadAudioAudioDownloadAudioIdGet**](#downloadaudioaudiodownloadaudioidget) | **GET** /audio/download/{audio_id} | Download Audio|
|[**downloadUrlAudioDownloadAudioIdUrlGet**](#downloadurlaudiodownloadaudioidurlget) | **GET** /audio/download/{audio_id}/url | Download Url|
|[**getAudioUrlAudioUrlAudioIdGet**](#getaudiourlaudiourlaudioidget) | **GET** /audio/url/{audio_id} | Get Audio Url|
|[**uploadAudioAudioUploadPost**](#uploadaudioaudiouploadpost) | **POST** /audio/upload | Upload Audio|

# **deleteAudioAudioAudioIdDelete**
> any deleteAudioAudioAudioIdDelete()

Delete audio file from both MinIO and database

### Example

```typescript
import {
    AudioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AudioApi(configuration);

let audioId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteAudioAudioAudioIdDelete(
    audioId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **audioId** | [**string**] |  | defaults to undefined|


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
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadAudioAudioDownloadAudioIdGet**
> any downloadAudioAudioDownloadAudioIdGet()

Download audio file by UUID

### Example

```typescript
import {
    AudioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AudioApi(configuration);

let audioId: string; // (default to undefined)

const { status, data } = await apiInstance.downloadAudioAudioDownloadAudioIdGet(
    audioId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **audioId** | [**string**] |  | defaults to undefined|


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
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadUrlAudioDownloadAudioIdUrlGet**
> any downloadUrlAudioDownloadAudioIdUrlGet()


### Example

```typescript
import {
    AudioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AudioApi(configuration);

let audioId: string; // (default to undefined)

const { status, data } = await apiInstance.downloadUrlAudioDownloadAudioIdUrlGet(
    audioId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **audioId** | [**string**] |  | defaults to undefined|


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
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAudioUrlAudioUrlAudioIdGet**
> any getAudioUrlAudioUrlAudioIdGet()

Get presigned URL for audio file access

### Example

```typescript
import {
    AudioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AudioApi(configuration);

let audioId: string; // (default to undefined)
let expires: number; // (optional) (default to 3600)

const { status, data } = await apiInstance.getAudioUrlAudioUrlAudioIdGet(
    audioId,
    expires
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **audioId** | [**string**] |  | defaults to undefined|
| **expires** | [**number**] |  | (optional) defaults to 3600|


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
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadAudioAudioUploadPost**
> AudioModel uploadAudioAudioUploadPost()

Upload audio file to MinIO and save metadata to database

### Example

```typescript
import {
    AudioApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AudioApi(configuration);

let file: File; // (default to undefined)
let uuid: string; // (optional) (default to '3d05bb09-dcc2-4cf0-90ca-7766b5be9ecb')
let folder: string; // (optional) (default to 'audio')

const { status, data } = await apiInstance.uploadAudioAudioUploadPost(
    file,
    uuid,
    folder
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | defaults to undefined|
| **uuid** | [**string**] |  | (optional) defaults to '3d05bb09-dcc2-4cf0-90ca-7766b5be9ecb'|
| **folder** | [**string**] |  | (optional) defaults to 'audio'|


### Return type

**AudioModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

