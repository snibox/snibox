# -*- mode: ruby -*-
# vi: set ft=ruby :

provision = <<SHELL
# add node 10.x
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

# add yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# setup dependencies
sudo apt-get update
sudo apt-get install -y build-essential git nodejs postgresql postgresql-contrib libpq-dev libssl-dev libreadline-dev zlib1g-dev yarn 

# setup rbenv
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# setup ruby-build
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# setup ruby
# https://stackoverflow.com/a/30106828
sudo -H -u vagrant bash -i -c 'rbenv install 2.6.1'
sudo -H -u vagrant bash -i -c 'rbenv global 2.6.1'
echo 'gem: --no-document' >> ~/.gemrc
sudo -H -u vagrant bash -i -c 'gem install bundler'

# configure pg
sudo -u postgres createuser -U postgres vagrant -s

# setup app
cd /vagrant
sudo -H -u vagrant bash -i -c 'bundle install'
sudo -H -u vagrant bash -i -c './bin/rake db:setup'
sudo -H -u vagrant bash -i -c './bin/rake assets:precompile'
SHELL

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  config.vm.provider :virtualbox do |vb|
    vb.name = "Snibox"
    vb.memory = 2048
    vb.cpus = 2
  end

  config.vm.network :forwarded_port, guest: 3000, host: 3000

  config.vm.synced_folder ".", "/vagrant"

  config.vm.provision :shell, inline: provision, privileged: false
end
