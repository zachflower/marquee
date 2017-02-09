# Marquee

Marquee is a command-line Node.js app that creates back-dated Git commits in
order to write a message on your GitHub contibution summary graph.

## Example

![Marquee Example](/images/example.png)

## Installation

```
npm install github-marquee
```
### Requirements

```
# Install the git-stats package globally
npm i -g git-stats
```
https://github.com/IonicaBizau/git-stats

## Usage

Writing a marquee message to your GitHub contribution summary graph is done in
a few steps.

### Step 1: Create a New Directory

Marquee is designed to work on a brand new repository. Because we are
manipulating history, it is a *really bad* idea to use this on an existing
repository.

```
$ mkdir hi-there
```

### Step 2: Create Commit Messages

Open up your terminal and use the following syntax to create a commit history
that maps to your message.

```
$ marquee <message>
```

### Step 3: Create a Public GitHub Repository

Marquee only creates a contribution history, it does not interface directly
with GitHub. After you've set up your commits, head over to
https://github.com/new and create a new repository.

Be sure to leave "Initialize this repository with a README" unchecked, and do
not add a license or .gitignore.

### Step 4: Push Your New Repository

After creating your repository, follow the GitHub instructions to "push an
existing repository from the command line." After pushing your repository, your
GitHub contribution summary graph will be updated immediately.
