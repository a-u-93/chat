#!/bin/dash

sudo wg-quick down wg0
docker build \
  --force-rm=true \
  -t 10.7.0.1:5000/vanilla-chat \
  .
sudo wg-quick up wg0
docker push 10.7.0.1:5000/vanilla-chat
eval "$(ssh-agent -s)" 2>&1 1>/dev/null
ssh-add ~/.ssh/id
ssh-add ~/.ssh/id_rsa
ssh -i ~/.ssh/id root@10.7.0.1 -p 22 'docker pull 10.7.0.1:5000/vanilla-chat'
ssh -i ~/.ssh/id root@10.7.0.1 -p 22 'docker rm -f vanilla-chat'
ssh -i ~/.ssh/id root@10.7.0.1 -p 22 \
  'docker run -h chat.ushakov.by --name vanilla-chat --restart=unless-stopped --net=host -d 10.7.0.1:5000/vanilla-chat'
until ssh -i ~/.ssh/id_rsa root@10.7.0.1 -p 33 'ls -la /srv'; do
  sleep 1
done
