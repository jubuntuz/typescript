## For creating a brand new empty branch see following link
https://stackoverflow.com/questions/13969050/creating-a-new-empty-branch-for-a-new-project   

Creating an orphan branch
```s
git checkout --orphan baseline
```

Delete everything in the orphan branch (don't forget the dot .)
Remember the new branch carried everything from the master at creation time 
```s
git rm -rf .
```
you can now switch between branches

```s
git checkout master
git checkout mybranch
```

https://tfs.cancercare.on.ca/tfs/CCO%20Applications/ORN/_git/ORRS