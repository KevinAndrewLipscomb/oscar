Set-Location "C:\Inetpub\wwwroot\oscar"
Start-Process -WindowStyle Maximized "."
Start-Process -WindowStyle Maximized .\oscar.sln
IF (Test-Path "C:\Program Files\MySQL\MySQL Workbench\MySQLWorkbench.exe")
  {
  Start-Process -WindowStyle Maximized "C:\Program Files\MySQL\MySQL Workbench\MySQLWorkbench.exe"
  }
ELSE
  {
  Start-Process -WindowStyle Maximized "C:\Program Files (x86)\MySQL\MySQL Workbench\MySQLWorkbench.exe"
  }
