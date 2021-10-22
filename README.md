## Creating a branch

### Before you create your branch

git checkout main
git pull

### Create your branch

git checkout -b &lt;initials&gt;/&lt;branch name&gt;

### Add your changes to your branch

git add .

### Make sure you have no conflicts with main

git checkout main
git pull
git checkout &lt;initials&gt;/ &lt;branch name&gt;
git merge main

### Commit and push changes to github

git commit -m "message about your changes"
git push

### Go to github repo to create pull request to merge your changes into our main branch
