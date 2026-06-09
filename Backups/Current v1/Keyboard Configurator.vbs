Set fso = CreateObject("Scripting.FileSystemObject")
Set app = CreateObject("Shell.Application")

here = fso.GetParentFolderName(WScript.ScriptFullName)
app.ShellExecute fso.BuildPath(here, "index.html"), "", here, "open", 1
