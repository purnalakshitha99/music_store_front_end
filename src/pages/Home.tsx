import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Music, Award, TrendingUp } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MusicGrid } from '../components/music/MusicGrid';
import { mockSongs, mockAlbums } from '../data/mockData';

export const Home: React.FC = () => {
  const featuredSongs = mockSongs.slice(0, 4);
  const featuredAlbums = mockAlbums.slice(0, 2);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Discover Your
                <span className="text-yellow-400 block">Perfect Sound</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Explore millions of songs, support your favorite artists, and enjoy high-quality music streaming with our premium platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Play className="w-5 h-5 mr-2" />
                  Start Listening
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-900">
                  Browse Music
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Music listening"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Music</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600">Songs Available</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Featured Artists</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1M+</h3>
              <p className="text-gray-600">Songs Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Songs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Songs</h2>
            <p className="text-lg text-gray-600">Discover the hottest tracks of the moment</p>
          </div>
          <MusicGrid items={featuredSongs} type="song" />
          <div className="text-center mt-8">
            <Link to="/browse">
              <Button variant="outline" size="lg">
                Browse All Music
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Albums */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Albums</h2>
            <p className="text-lg text-gray-600">Complete collections from top artists</p>
          </div>
          <MusicGrid items={featuredAlbums} type="album" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of music lovers and artists on our platform. Discover new sounds, support artists, and enjoy unlimited music.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                Explore Music
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};