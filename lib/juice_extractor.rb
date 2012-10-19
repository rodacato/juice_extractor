require "juice_extractor/version"
require "rmagick"
require 'json'

module JuiceExtractor
  # TODO: Extend other modules here
  #"[\"background-color\",\"border-color\",\"color\"]"
end

module ColorExtractor
  def self.implicit_colors(site_url, quantize = nil)
    return [] if site_url.nil?
    image_path = Base.screenshot(site_url)
    img = Magick::ImageList.new(image_path)
    img = img.quantize(quantize) if quantize
    img.color_histogram.map{|pixel| pixel.first.to_color(Magick::AllCompliance, false, 8, true) }
  end

  def self.explicit_colors(site_url, attributes = ['background-color', "border-color", 'color'], quantize = nil)
    return {} if site_url.nil?
    phantom_script = File.expand_path(File.dirname(__FILE__) + "/juice_extractor/js/styles.phantom.js")
    val = `phantomjs #{phantom_script} #{site_url} #{ File.dirname(__FILE__) } '#{attributes.to_json}'`
    colors= Base.build_explicit_colors(val, attributes, quantize)
    colors
  end

  module Base
    def self.screenshot(site_url, to_path = '/tmp/')
      image_name = "#{to_path}#{rand(36**10).to_s(36)}.png"
      phantom_script = File.expand_path(File.dirname(__FILE__) + "/juice_extractor/js/screenshot.phantom.js")
      `phantomjs --load-images=no #{phantom_script} #{site_url} #{image_name}`
      image_name
    end

    def self.build_explicit_colors(val, attributes, max = nil)
      colors = JSON.parse(val)

      attributes.each do |prop|
        colors['containers'][prop] = colors['containers'][prop].compact.group_by.map{|e| [e, e.length]}.uniq.sort{|a,b| b[1] <=> a[1]}.map{|e| e[0].upcase }
        colors['typography'][prop] = colors['typography'][prop].compact.group_by.map{|e| [e, e.length]}.uniq.sort{|a,b| b[1] <=> a[1]}.map{|e| e[0].upcase }

        if max && max > 0
          colors['containers'][prop] = colors['containers'][prop][0..max-1]
          colors['typography'][prop] = colors['typography'][prop][0..max-1]
        end
      end

      colors
    end
  end
end
