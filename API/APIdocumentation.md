Please follow the instruction below when accessing the API endpoints 

1. /Register



------------------------------------------------------------
2. /Login



------------------------------------------------------------
3. /AddContact
    The AddContact endpoint requires a JSON object that contains ALL the necessary fields required to make a contact.
    Additionally, a valid user must be logged in if they are trying to access this endpoint.
    These fields include:
        1. firstName
        2. lastName
        3. email
        4. phoneNumber
        5. userId
    Example JSON payload:
        {
            "firstName": "John",
            "lastName: "Doe",
            "email": "johndoe@site.com",
            "phoneNumber": "1234567890"
        }
    In response either a JSON object will be sent back, either containing a success or an error message describing what happened
    Example JSON response: 
    {
        "success": "Contact successfully added!"
    }

------------------------------------------------------------
4. /UpdateContact
    The UpdateContact endpoint requires a JSON object that contains 0 or more of the necessary fields to make a contact and the id of the contact that is 
    being updated (REQUIRED) and the current user's id (REQUIRED). If certain fields are empty, then the endpoint will keep the previous value.
    Additionally, if the user isn't linked to this contact via Foreign Key and tries to update it, an error will occur and no update will be made.
    Exampled JSON payload:
    {
         "newFirstName": "John",
         "newLastName: "Doe",
         "newEmail": "johndoe@site.com",
         "newPhoneNumber": "1234567890",
         "id": 3,
         "userId": 1
    }
    In response either a JSON object will be sent back, either containing a success or an error message describing what happened
    Example JSON response: 
    {
        "success": "Contact successfully updated!"
    }

------------------------------------------------------------
5. /DeleteContact
    The DeleteContact endpoint requires a JSON object that contains the id of the contact that is being deleted (REQUIRED) as well as the current user's id (REQUIRED).
    Additionally, if the user isn't linked to this contact via Foreign Key and tries to delete it, an error will occur and no deletion will be made.
    Example JSON payload:
    {
        "id": 3,
        "userId": 1
    }
    In response either a JSON object will be sent back, either containing a success or an error message describing what happened
    Example JSON response: 
    {
        "success": "Contact successfully deleted!"
    }


