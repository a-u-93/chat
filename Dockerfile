from debian:bookworm
add debian_repo /etc/apt/sources.list
run \
  apt update && \
  apt dist-upgrade -y -t bookworm-backports
run \
  apt install -y -t bookworm-backports --no-install-recommends \
    npm nodejs openssh-server jq curl wget nmap git tmux vim-tiny psmisc
add sshd /etc/ssh/sshd_config
run mkdir /var/run/sshd
run \
  git config --global init.defaultBranch master && \
  git init /srv && \
  cd /srv && \
  git config receive.denyCurrentBranch updateInstead
add post-receive /srv/.git/hooks/post-receive
run mkdir /root/.ssh
add ssh_key /root/.ssh/authorized_keys
entrypoint ["/usr/sbin/sshd", "-D", "-e"]
