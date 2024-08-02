@echo off
REM Fetches all GitHub issues and pull requests and outputs the selected fields in CSV format

REM Define the GitHub repository in the format owner/repo
set REPO=VinhVTHE181750/mJOB

REM Temporary files to store outputs
set ISSUES_FILE=issues.csv
set PRS_FILE=prs.csv
set OUTPUT_FILE=combined.csv

REM Fetch issues
echo Fetching issues...
gh issue list --limit 1000 --repo %REPO% --state all ^
--json number,state,title,labels,createdAt,milestone,author,assignees ^
--jq "map([\"ISSUE\", .number,.state,.title,.createdAt,(.milestone.title//\"\"),(.labels|map(.name)|join(\",\")),(.author.login),(.assignees|map(.login)|join(\",\"))])[]|@csv" >%ISSUES_FILE%

REM Fetch pull requests
echo Fetching pull requests...
gh pr list --limit 1000 --repo %REPO% --state all ^
--json number,state,title,labels,createdAt,milestone,author,assignees ^
--jq "map([\"PULL_REQUEST\", .number,.state,.title,.createdAt,(.milestone.title//\"\"),(.labels|map(.name)|join(\",\")),(.author.login),(.assignees|map(.login)|join(\",\"))])[]|@csv" >%PRS_FILE%

REM Combine issues and pull requests into one output file
echo Combining issues and pull requests...
(echo "type,number,state,title,updatedAt,createdAt,milestone,labels,assignees" & type %ISSUES_FILE% & type %PRS_FILE%) >%OUTPUT_FILE%

REM Output the result
echo Output written to %OUTPUT_FILE%

REM Cleanup temporary files
del %ISSUES_FILE%
del %PRS_FILE%

echo Done.
pause
