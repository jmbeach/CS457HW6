mongo CS457 < commands.js | sed -n -e '/assert/,$p' > err.txt
cat err.txt | grep -m 1 msg > errmsg.txt
