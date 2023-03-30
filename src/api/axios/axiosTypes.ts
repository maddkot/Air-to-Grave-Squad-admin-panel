export type errorResponseData = {
    error: string
    message: null
    path: string
    requestId: string
    status: number
    timestamp: string
  }
  
  export type errorResponse = {
    config: any,
    data: errorResponseData,
    headers: any,
    request: any,
    status: number,
    statusText: string,
  }
  
  export type Error = {
    response: errorResponse
  }
  