declare type ApiReponse<T> = {
    statusCode :number,
    message : string ,
    content :T,
}