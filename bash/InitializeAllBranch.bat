:: Ne pas afficher les commandes et n'afficher que la commande tapez
@echo off
cls
echo %0 %*
:: Connaitre le nombre d'argument
set argument=0
for %%x in (%*) do Set /A argument+=1

if %argument% equ 0 goto no_argument
if %argument% equ 1 goto argument
if %argument% gtr 1 goto error 

exit

:no_argument
echo Quel est la branch qui initialisera tout le monde ?
set /p new_argument=""
goto script
exit

:argument
set new_argument=%1
goto script
exit

:script
goto master
exit

:master
if %new_argument% neq master (
    goto amine
) else (
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout amine
    git pull
    git merge master
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout natha
    git pull
    git merge master
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout mehdi
    git pull
    git merge master
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
)
exit
:amine
if %new_argument% neq amine (
    goto natha
) else (
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout natha
    git pull
    git merge amine
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout mehdi
    git pull
    git merge amine
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
)
exit
:natha
if %new_argument% neq natha (
    goto mehdi
) else (
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout amine
    git pull
    git merge natha
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout mehdi
    git pull
    git merge natha
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
)
exit
:mehdi
if %new_argument% neq mehdi (
    echo Votre argument n'es pas dans la liste definit
    goto no_argument
) else (
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout amine
    git pull
    git merge master
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
    ::Changement de branch, puis merge puis push tout sur le serveur github
    git checkout natha
    git pull
    git merge master
    git add .
    git commit -m "Initialisation de la branch par rapport à :"%new_argument%
    git push
)
exit

:error
echo ERROR: Il n'y pas le bon nombre d'argument en entrer, merci de tapez:  .\bash\InitializeAllBranch.bat
exit
