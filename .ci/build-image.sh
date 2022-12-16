# * Update version & deploy image

PATCH=false

while getopts "r:p" arg; do
  case $arg in
    p) 
        PATCH=true
        ;;
  esac
done

# Update in package.json
if [ "$PATCH" == true ];
then
    npm version patch --no-git-tag-version
else
    npm version minor --no-git-tag-version
fi

# Read new version
NEW_VERSION="$(cat ./package.json | jq -r '.version')"

if [[ -z "$NEW_VERSION" ]]; then
    echo "Error: Version is empty. Can not deploy images."
    exit 1
fi

IMAGE_NAME="cherryswap:v${NEW_VERSION}"

docker build -t ${IMAGE_NAME} . || exit 1
