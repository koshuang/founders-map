require 'mina/multistage'
require 'mina/rvm'
require 'mina/npm'
require 'mina/bundler'
require 'mina/git'
require 'json'
# require 'mina/rbenv'  # for rbenv support. (http://rbenv.org)
# require 'mina/rvm'    # for rvm support. (http://rvm.io)

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)
set :application, 'founders-map'

set :deploy_to, "/opt/www/#{application}"
set :repository, 'git@github.com:koshuang/founders-map.git'
set :branch, 'develop'

set :npm_options, ''

# For system-wide RVM install.
#   set :rvm_path, '/usr/local/rvm/bin/rvm'
set :rvm_path, "/usr/local/rvm/bin/rvm"

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, %w{}

set_default :node_version, 'stable'

# Optional settings:
#   set :user, 'foobar'    # Username in the server to SSH to.
#   set :port, '30000'     # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  # If you're using rbenv, use this to load the rbenv environment.
  # Be sure to commit your .ruby-version or .rbenv-version to your repository.
  # invoke :'rbenv:load'

  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use[ruby-1.9.3-p125@default]'
  invoke :'rvm:use[ruby-2.1.2@default]'
  invoke :'nvm:load'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task :setup => :environment do
  invoke :'nvm'

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/log"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/config"]

  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/node_modules"]
  queue! %[mkdir -p "#{deploy_to}/#{shared_path}/bower_components"]


  queue %[
    repo_host=`echo $repo | sed -e 's/.*@//g' -e 's/:.*//g'` &&
    repo_port=`echo $repo | grep -o ':[0-9]*' | sed -e 's/://g'` &&
    if [ -z "${repo_port}" ]; then repo_port=22; fi &&
    ssh-keyscan -p $repo_port -H $repo_host >> ~/.ssh/known_hosts
  ]
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  to :before_hook do
    # Put things to run locally before ssh
  end
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'nvm:install'
    invoke :'npm:install'
    invoke :'bower:install'
    invoke :'gulp:install'
    invoke :'deploy:cleanup'

    to :launch do
      queue "mkdir -p #{deploy_to}/#{current_path}/tmp/"
      queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
    end
  end
end

task :nvm do
  queue 'echo "-----> Installing Node Version Manager"'
  queue 'curl -s https://raw.github.com/creationix/nvm/master/install.sh | sh'
  invoke :'nvm:load'
end

namespace :nvm do
  task :load do
    queue 'echo "-----> Loading nvm"'
    queue %{
      source ~/.nvm/nvm.sh
    }
    queue 'echo "-----> Now using nvm v.`nvm --version`"'
  end

  task :install do

    # Specifying a Node.js version
    # copy from: https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version
    #
    # Use the engines section of your package.json
    # {
    #   "name": "myapp",
    #   "description": "a really cool app",
    #   "version": "0.0.1",
    #   "engines": {
    #     "node": "0.10.x"
    #   }
    # }

    package = File.read("package.json")
    config = JSON.parse(package)
    if config['engines'] && config['engines']['node']
      set :node_version, config['engines']['node']
    end

    # Install Node.js via Node Version Manager
    # and symlink it to project_dir/.bin

    queue %{
      echo "-----> Install node v.#{node_version!}"
      nvm install #{node_version!}
      ln -s ${NVM_BIN} ./.bin
    }
  end

end

namespace :gulp do
  task :install do
    queue %{
      echo "-----> gulp build"
      gulp build
    }
  end
end
# namespace :npm do
#   task :install do
#     echo_cmd "npm install bower -g"
#     echo_cmd "npm install gulp-cli -g"
#     echo_cmd "npm install"
#   end
#
# end
#
# namespace :bower do
#   task :install do
#     queue 'bower install'
#   end
#
# end

# For help in making your deploy script, see the Mina documentation:
#
#  - http://nadarei.co/mina
#  - http://nadarei.co/mina/tasks
#  - http://nadarei.co/mina/settings
#  - http://nadarei.co/mina/helpers
