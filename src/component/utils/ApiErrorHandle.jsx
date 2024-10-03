export const handleApiError =  (error)=>{
    let errorMessage = "Some Error Has arrised"
    if (error){
        if(error.message){
            errorMessage = error.message
        }
        if(error.response){
            if(error.response.data){
                if(error.response.data.non_field_errors){
                    errorMessage = error.response.data.non_field_errors[0]
                }
            }
        }
        
    }

    return errorMessage
}