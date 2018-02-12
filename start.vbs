On Error Resume next
Set emailObj      = CreateObject("CDO.Message")
emailObj.From     = "yukun@lithodomosvr.com"

emailObj.To       = "yukun@lithodomosvr.com"

emailObj.Subject  = "Backup Starting"
emailObj.TextBody = "The scheduled backup is now starting"

Set emailConfig = emailObj.Configuration



emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.gmail.com"
emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 465
emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing")    = 2  
emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1  
emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/smtpusessl")      = true 
emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/sendusername")    = "yukun@lithodomosvr.com"
emailConfig.Fields("http://schemas.microsoft.com/cdo/configuration/sendpassword")    = "hyk2197696"
emailConfig.Fields.Update

emailObj.Send



