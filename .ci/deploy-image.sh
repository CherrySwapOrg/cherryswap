# * Update version & deploy image

PATCH=false

while getopts "r:p" arg; do
  case $arg in
    p) 
        PATCH=true
        ;;
    r) 
        REGISTRY=$OPTARG
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

# Update in chart version
VERSION=$NEW_VERSION yq -i '.appVersion = strenv(VERSION)' ./kubernetes/Chart.yaml

if [[ -z "$REGISTRY" || -z "$NEW_VERSION" ]]; then
    echo "Error: Registry or version is empty. Can not deploy images."
    exit 1
fi

PROJECT="evercode-lab/white-label-landing"

docker build -t ${PROJECT} . || exit 1
docker tag ${PROJECT} "${REGISTRY}/evercode-lab/white-label-landing:v${NEW_VERSION}" || exit 1
docker push "${REGISTRY}/${PROJECT}:v${NEW_VERSION}" || exit 1
