require "juice_extractor/version"
require "rmagick"

module JuiceExtractor
  def self.screenshot(site_url, to_path = '/tmp/')
    image_name = "#{to_path}#{rand(36**10).to_s(36)}.png"
    phantom_script = File.expand_path(File.dirname(__FILE__) + "/juice_extractor/js/screenshot.phantom.js")
    `phantomjs --load-images=no #{phantom_script} #{site_url} #{image_name}`
    image_name
  end

  def self.implicit_colors(site_url)
    image_path = screenshot(site_url)
    img = Magick::ImageList.new(image_path)
    img.color_histogram.map{|pixel| pixel.first.to_color(Magick::AllCompliance, false, 8, true) }
  end

  def self.explicit_colors(site_url)
    phantom_script = File.expand_path(File.dirname(__FILE__) + "/juice_extractor/js/styles.phantom.js")
    `phantomjs #{phantom_script} #{site_url} #{ File.dirname(__FILE__) }`
  end
end