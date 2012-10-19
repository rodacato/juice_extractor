# -*- encoding: utf-8 -*-
require File.expand_path('../lib/juice_extractor/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Adrian Castillo"]
  gem.email         = ["rodacato@gmail.com"]
  gem.description   = %q{Get the color palette from sites}
  gem.summary       = %q{Extract the colors explicit and implicit on the site you want}
  gem.homepage      = "http://www.wkamole.herokuapp.com"

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "juice_extractor"
  gem.require_paths = ["lib"]
  gem.version       = JuiceExtractor::VERSION

  gem.add_dependency 'rmagick', "2.12.0"
  gem.add_dependency 'json'
  
  gem.add_development_dependency 'ruby-debug'
end