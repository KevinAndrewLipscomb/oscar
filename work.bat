REM
REM $Id: work.bat 7035 2020-04-13 18:47:08Z kevinanlipscomb $
REM
cd "C:\Inetpub\wwwroot\oscar"
start /max explorer /e,/select,C:\Inetpub\wwwroot\oscar\.git
start /max oscar.sln
IF EXIST "C:\Program Files\MySQL\MySQL Workbench\MySQLWorkbench.exe" (start "" /max "C:\Program Files\MySQL\MySQL Workbench\MySQLWorkbench.exe") ELSE start "" /max "C:\Program Files (x86)\MySQL\MySQL Workbench\MySQLWorkbench.exe"
