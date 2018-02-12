' Created by: Shawn Brink
' http://www.sevenforums.com
' Tutorial:  http://www.sevenforums.com/tutorials/203196-backup-make-create-new-backup-shortcut.html



If WScript.Arguments.Count = 0 Then
	Set UAC = CreateObject("Shell.Application")
	UAC.ShellExecute "wscript.exe", Chr(34) & WScript.ScriptFullName & Chr(34) & " Run", , "runas", 1
Else
	Set BACKUP = CreateObject("WScript.Shell")

	BACKUP.run "%SystemRoot%\System32\sdclt.exe /KICKOFFNEW"
	WScript.sleep(2000)
	BACKUP.run "%SystemRoot%\System32\sdclt.exe /UIMODE /SHOW"
End If