Example REST
------------

```
npm install
grunt mb-start
grunt add-data
```

Use `Curl` to POST 
```
$ curl -i -X POST -H 'Content-Type: application/json' http://127.0.0.1:4545/test --data '{"requiredField": true, "optionalField": true"}'
``` 
which gets back a reply:
```
HTTP/1.1 200 OK
Connection: close
Date: Wed, 06 Apr 2016 19:36:31 GMT
Transfer-Encoding: chunked
```

POST with missing mandatory field 
```
curl -i -X POST -H 'Content-Type: application/json' http://127.0.0.1:4545/test --data '{"optionalField": true}'
```

gets back 400:
```
HTTP/1.1 400 Bad Request
Connection: close
Date: Wed, 06 Apr 2016 19:40:33 GMT
Transfer-Encoding: chunked
```