## Creating a branch

### Step 1

#### First step of the day

```
> git checkout main
> git pull
```

### Step 2

#### Create branch

```
> git checkout -b <your initials>/<your branch name>
```

### Step 3

#### Add & commit your code to your branch

```
> git add .
> git commit -m "message about your changes"
```

### Step 4

#### Make sure you have no conflicts with main

```
> git checkout main
> git pull
> git checkout <your initials>/<your branch name>
> git merge main
```

### Step 5

### Push changes to github

```
> git push
```

_if encountered conflicts with merge - after successful resolution, do another git commit "Step 3"_

### Go to github repo to create pull request to merge your changes into our main branch

## Wire frames

### Drinks page

![wire frame drinks](./assets/images/wireframe-drinks.png)

## Github Deployed Application

[https://jonkhunkle.github.io/Project-1/](https://jonkhunkle.github.io/Project-1/)
