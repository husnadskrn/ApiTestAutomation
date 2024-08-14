class Data {

    headerPayload() {
        const headerBody = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        return headerBody;
    }

    bodyPayload() {
        const postData = {
            "id": 3,
            "category": {
                "id": 1,
                "name": "cat"
            },
            "name": "cat",
            "photoUrls": [
                "http://example.com/photo1.jpg"
            ],
            "tags": [
                {
                    "id": 2,
                    "name": "bella"
                }
            ],
            "status": "sold"
        }
        return postData;
    }

    invalidBodyPayload() {
        const postData = "<xml><id>1</id><name>doggie</name></xml>";
        return postData;
    }

    updatePayload() {
        const postData = {
            "id": 0,
            "category": {
                "id": 1,
                "name": "cats"
            },
            "name": "newDoggie",
            "photoUrls": [
                "https://example.com/new-photo.jpg"
            ],
            "tags": [
                {
                    "id": 1,
                    "name": "friendly"
                }
            ],
            "status": "sold"
        }
        return postData;
    }
}

export default Data;