import { useState } from 'react'
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import EditIcon from '@mui/icons-material/Edit'

function TextFieldCustom({name, onChange, value, label, placeholder}) {
    const [isAdornmentVisible, setIsAdornmentVisible] = useState(true);

    const handleFocus = () => {
        setIsAdornmentVisible(false)
    };

    const handleBlur = () => {
        setIsAdornmentVisible(true)
    };
    
    return (
        <TextField
                  name={name}
                  onChange={onChange}
                  value={value}
                  id="standard-basic"
                  label={label}
                  placeholder={placeholder}
                  variant="standard"
                  sx={{width: 256, height: 56}}
                  InputProps={{
                    endAdornment: (
                      isAdornmentVisible && (
                      <InputAdornment position="end">
                        <EditIcon fontSize='small'/>
                      </InputAdornment>
                      )
                    ),
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
    )
}

export default TextFieldCustom