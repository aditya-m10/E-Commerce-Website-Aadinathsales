import {useState} from "react";
import { Alert,TextField,DialogContent,DialogContentText,Typography,Box ,Button } from "@mui/material";
import { useSendEmailMutation } from '../../../services/Authenticationapi';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const Sendmail=()=>{
    const [serverError,setServerError]=useState({})
    const [server_msg, setServerMsg] = useState({})
    const [loading, setLoading] =useState(false);

    const [sendEmail] = useSendEmailMutation();


    
    const onSubmitmail=async (e)=> {
        setLoading(true)
        e.preventDefault();
        e.stopPropagation()
        const data= new FormData(e.currentTarget);
        const actualData={
            email: data.get('email'),
        }
        const res = await sendEmail(actualData)
        if (res.error) {
        setServerMsg({})
        setServerError(res.error.data.errors)
        setLoading(false)
      }
        if(res.data){

          setServerMsg(res.data)
          document.getElementById("forget-form").reset()

          setServerError({})
          window.location.reload();


             }    
    }
    return (
        <>

        <DialogContent>
        <DialogContentText>
             Please enter your email address here. We
            will send link in your email.
          </DialogContentText>
          <Box onSubmit={onSubmitmail} component='form' id="forget-form" noValidate  >

          <TextField autoFocus  variant="standard"  autoComplete='off' margin="normal" fullWidth required  id="email" name="email" label="Email"/>
          {serverError.email ? <Typography style={{fontSize: 12, color:'red'}}>{serverError.email[0]}</Typography> : ""}
          {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors[0]}</Alert> : ''}
          {server_msg.msg ? <Alert style={{ fontSize: 12}} sx={{my:1}} severity='success'>{server_msg.msg}</Alert> : ''}

          <Box  display="flex"   justifyContent="center"  alignItems="center"  >
                   
          <LoadingButton
          
          loading={loading}
          type="submit"
          style={{ borderRadius: 25,fontSize: 12 }}
          sx={{color:"white"}}
          variant="contained"
        >
          <span>Send</span>
        </LoadingButton></Box>
          </Box>

        </DialogContent>

        

        </>
    )
}

export default Sendmail;