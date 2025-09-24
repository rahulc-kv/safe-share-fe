// import {
//   createApi,
//   fetchBaseQuery,
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
//   FetchBaseQueryMeta
// } from '@reduxjs/toolkit/dist/query/react';

// import { showNotifier } from '../reducers/appReducer';
// import { ERROR_CODE_MAPPER } from 'constants/errorCodeMapper';
// import { NotifierTypes } from 'constants/common';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { ExtraOptions, HandleNotifierLogics } from './type';
// import store from 'store/store';
// import { setUserLogout } from 'utils/userAuth';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from 'constants/common';
// import { getLocalData, setLocalData } from 'utils/localStorage';
// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const handleNotifier: HandleNotifierLogics = (
  result,
  extraOptions,
  errorCodeMapper
) => {
  if (result?.error && extraOptions?.showNotifier && extraOptions?.failure) {
    let notifierMessage = extraOptions.failure;
    const error: any = result.error;
    if (!extraOptions?.showCustomMessage && error?.data?.error) {
      const errorObj = error?.data?.error;
      // check for the message in the ERROR_CODE_MAPPER object
      if (errorObj.message && errorCodeMapper[errorObj.message]) {
        notifierMessage = errorCodeMapper[errorObj.message];
      } else if (errorObj.details?.length > 0) {
        // shows the default BE message if corresponding message for code is not available
        notifierMessage = errorObj.details?.join(',');
      }
    }
    // store.dispatch(
    //   showNotifier({
    //     message: notifierMessage,
    //     type: extraOptions?.failureNotifierType || NotifierTypes.ERROR
    //   })
    // );
  } else if (
    result &&
    !result.error &&
    extraOptions?.showNotifier &&
    extraOptions?.success
  ) {
    // store.dispatch(
    //   showNotifier({
    //     message: extraOptions.success,
    //     type: extraOptions?.successNotifierType || NotifierTypes.SUCCESS
    //   })
    // );
  }
};

const throwGenericError = error => {
  // store.dispatch(
  //   showNotifier({
  //     message: "Something went wrong",
  //     type: NotifierTypes.ERROR
  //   })
  // );
  return error;
};

/* REST API*/
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://restcountries.com/v3.1/',
  prepareHeaders(headers, api) {
    // const token = getLocalData(ACCESS_TOKEN);
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token.replaceAll('"', '')}`);
    // }
    return headers;
  },
  credentials: 'include'
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // Args
  unknown, // Result
  FetchBaseQueryError,  // Error
  ExtraOptions, // DefinitionExtraOptions
  object // Meta
> = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // Try to get a new token
      // const refreshToken = getLocalData(REFRESH_TOKEN);
      // if (!refreshToken) {
      //   setUserLogout();
      //   return result;
      // }

      // const refreshResult = await baseQuery(
      //   {
      //     url: 'auth/refresh',
      //     method: 'POST',
      //     body: { refreshToken }
      //   },
      //   api,
      //   extraOptions
      // ) as QueryReturnValue<
      // {
      //     data: {
      //       accessToken: string;
      //       refreshToken: string;
      //     };
      // },
      // FetchBaseQueryError,
      // FetchBaseQueryMeta
    // >;

      // if (refreshResult.data?.data) {
      //   const { accessToken, refreshToken: newRefreshToken } = refreshResult.data.data;
 
      //   // Store the new tokens
      //   setLocalData(ACCESS_TOKEN, accessToken);
      //   setLocalData(REFRESH_TOKEN, newRefreshToken);

      //   // Retry the original query with new access token
      //   result = await baseQuery(args, api, extraOptions);
      // } else {
      //   setUserLogout();
      // }
    }

    handleNotifier(result, extraOptions as ExtraOptions, {});
    
    return result;
  } catch (error) {
    return throwGenericError(error);
  }
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [
    'GetIncidentsList'
  ],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true
});

// /* Auth API */
// const authBaseQuery = fetchBaseQuery({
//   baseUrl: `${process.env.REACT_APP_AUTH_SVC_API_ENDPOINT}/${process.env.REACT_APP_AUTH_SVC_API_VERSION}/`,
//   credentials: 'include'
// });

// const customFetchAuthBaseQuery: BaseQueryFn<
//   string | FetchArgs, // Args
//   unknown, // Result
//   unknown, // Error
//   ExtraOptions, // DefinitionExtraOptions
//   object // Meta
// > = async (arg, api, extraOptions) => {
//   try {
//     const result = await authBaseQuery(arg, api, extraOptions);
//     handleNotifier(result, extraOptions, AUTH_SVC_ERROR_CODE_MAPPER);
//     return result;
//   } catch (error) {
//     throwGenericError(error);
//   }
// };

// export const authBaseApi = createApi({
//   reducerPath: 'authBaseApi',
//   baseQuery: customFetchAuthBaseQuery,
//   endpoints: () => ({}),
//   tagTypes: [
//     'GetUserDetails',
//     'GetClientDetails',
//     'GetProfessionalDetails',
//     'GetPendingInviteCount'
//   ]
// });

export default baseApi;
