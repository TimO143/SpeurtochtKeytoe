

set -e

set -o pipefail

function build {

  if npm run production; then

  rsync -avz -e "ssh -p 22 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" -av --exclude=.DS_Store build/ kwizz@185.96.4.70:/home/kwizz/public_html

    echo "\033[1;42m                              \033[0m"

    echo "\033[1;42m   Built. Files uploaded!     \033[0m"

    echo "\033[1;42m                              \033[0m"

  else

    echo "\033[1;101m                      \033[0m"

    echo "\033[1;101m   Build failed...    \033[0m"

    echo "\033[1;101m                      \033[0m"

  fi

}

trap build EXIT

