export type Error = {
  name: string;
  password: string;
  email: string;
}

export type FormData = {
  name: string;
  password: string;
  email: string;
}

export type SigninFormData = {
  password: string;
  email: string;
}

export type SigninError = {
  password: string;
  email: string;
}

export const validateUser = (
  value: FormData,
  setError: React.Dispatch<React.SetStateAction<Error>>
) => {  
  let _error = {
    name: "",
    password: "",
    email: ""
  }
  let skipFetch = false

  Object.keys(value).forEach(function(key) {
    if (!value[key]) {
      _error[key] = `${key} is required key!`
      skipFetch = true
    }
  })

  setError(_error)
  return skipFetch
}

export const validateSingIn = (
  value: SigninFormData,
  setError: React.Dispatch<React.SetStateAction<SigninError>>
) => {  
  let _error = {
    password: "",
    email: ""
  }
  let skipFetch = false

  Object.keys(value).forEach(function(key) {
    if (!value[key]) {
      _error[key] = `${key} is required key!`
      skipFetch = true
    }
  })

  setError(_error)
  return skipFetch
}