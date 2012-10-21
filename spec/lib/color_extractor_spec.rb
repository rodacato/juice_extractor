require "spec_helper"
require "juice_extractor"

describe ColorExtractor do
  before do
    @site_url = "http://www.github.com"
  end
  
  context "Implicit Colors" do
    it "should return an array of colors" do
      ColorExtractor::Base.stubs(:screenshot).returns('spec/fixtures/github.png')
      colors = ColorExtractor.implicit_colors(@site_url)
      colors.class.should be Array
      colors.first.should == '#EEF7FA'
    end

    it "should return an array of colors limited by the quantize" do
      ColorExtractor::Base.stubs(:screenshot).returns('spec/fixtures/github.png')
      colors = ColorExtractor.implicit_colors(@site_url, 10)
      colors.class.should be Array
      colors.length.should == 10
    end
  end

  context "Explicit Colors" do
    xit "should return an structure of colors"
  end

  context ColorExtractor::Base do
    describe "screenshot" do
      it "should take a screenshot for the url specified", :slow => true do
        name = ColorExtractor::Base.screenshot(@site_url)
        File.exists?(name).should be_true
      end

      it "should take a screenshot for the url specified on the path specified", :slow => true do
        name = ColorExtractor::Base.screenshot(@site_url, '/tmp')
        File.exists?(name).should be_true
      end
    end

    describe "build_explicit_colors" do
      it "should generate an object extructure base on the default attributes" do
          attrs = ['background-color', 'color', 'border-color']
          data = File.open('spec/fixtures/color-explicit-default.json').read
          ColorExtractor::Base.stubs(:color_explicit_cmd).returns(data)
          colors = ColorExtractor::Base.build_explicit_colors(data, attrs)
          attrs.each do |n|
            colors['containers'].should include(n)
          end
          colors['containers'].length.should be 3
      end

      it "should generate an object extructure base on custom attributes" do
        attrs = ['border-color']
        data = File.open('spec/fixtures/color-explicit-custom.json').read
        ColorExtractor::Base.stubs(:color_explicit_cmd).returns(data)
        colors = ColorExtractor::Base.build_explicit_colors(data, attrs)
        attrs.each do |n|
          colors['containers'].should include(n)
        end
        colors['containers'].length.should be 1
      end
      
      it "should limit the number of elements returned" do
        attrs = ['border-color']
        data = File.open('spec/fixtures/color-explicit-custom.json').read
        ColorExtractor::Base.stubs(:color_explicit_cmd).returns(data)
        colors = ColorExtractor::Base.build_explicit_colors(data, attrs, 2)
        colors['containers']['border-color'].length.should be 2
      end
    end
    
  end
end