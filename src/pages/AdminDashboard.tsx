import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Music, DollarSign, TrendingUp, Shield, Check, X, Eye } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockUsers, mockSongs, mockOrders, salesData } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const totalUsers = mockUsers.filter(u => u.role === 'user').length;
  const totalArtists = mockUsers.filter(u => u.role === 'artist').length;
  const totalSongs = mockSongs.length;
  const pendingSongs = mockSongs.filter(s => !s.approved).length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingContent = mockSongs.filter(song => !song.approved);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content Review', icon: Music },
    { id: 'analytics', label: 'Analytics', icon: BarChart }
  ];

  const handleApproveContent = (songId: string) => {
    // In a real app, this would update the backend
    console.log('Approving song:', songId);
    alert('Song approved successfully!');
  };

  const handleRejectContent = (songId: string) => {
    // In a real app, this would update the backend
    console.log('Rejecting song:', songId);
    alert('Song rejected.');
  };

  const handleBlockUser = (userId: string) => {
    // In a real app, this would update the backend
    console.log('Blocking user:', userId);
    alert('User blocked successfully!');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, content, and platform analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Administrator</h3>
                  <p className="text-sm text-gray-600">System Admin</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-red-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold">{totalUsers}</h3>
                        <p className="text-gray-600">Total Users</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center">
                      <Music className="w-8 h-8 text-purple-600" />
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold">{totalArtists}</h3>
                        <p className="text-gray-600">Artists</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Music className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold">{totalSongs}</h3>
                        <p className="text-gray-600">Total Songs</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <div className="flex items-center">
                      <DollarSign className="w-8 h-8 text-yellow-600" />
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold">${totalRevenue.toFixed(0)}</h3>
                        <p className="text-gray-600">Revenue</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-orange-600">Pending Reviews</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Songs awaiting approval</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                          {pendingSongs}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>User reports</span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                          3
                        </span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-600">Recent Activity</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>New user registrations</span>
                        <span className="text-green-600">+12 today</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Songs uploaded</span>
                        <span className="text-blue-600">+5 today</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total sales</span>
                        <span className="text-purple-600">$124.50 today</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">User Management</h2>
                  <div className="w-64">
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4">User</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Join Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' :
                              user.role === 'artist' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.blocked ? 'Blocked' : 'Active'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" icon={Eye}>
                                View
                              </Button>
                              {!user.blocked ? (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600"
                                  onClick={() => handleBlockUser(user.id)}
                                >
                                  Block
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" className="text-green-600">
                                  Unblock
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {activeTab === 'content' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Content Review</h2>
                
                {pendingContent.length === 0 ? (
                  <div className="text-center py-8">
                    <Check className="w-16 h-16 text-green-300 mx-auto mb-4" />
                    <p className="text-gray-500">No content pending review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingContent.map(song => (
                      <div key={song.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={song.thumbnail}
                            alt={song.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{song.title}</h3>
                            <p className="text-gray-600">{song.artist}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">Genre: {song.genre}</span>
                              <span className="text-sm text-gray-500">Price: ${song.price}</span>
                              <span className="text-sm text-gray-500">Duration: {song.duration}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Uploaded: {new Date(song.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              icon={Check}
                              variant="secondary"
                              onClick={() => handleApproveContent(song.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              icon={X}
                              variant="danger"
                              onClick={() => handleRejectContent(song.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Genres</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Pop</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="w-16 h-2 bg-purple-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">67%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Electronic</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="w-12 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">50%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Hip Hop</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div className="w-8 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">33%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Platform Growth</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Users</span>
                          <span className="text-sm font-medium">+15% this month</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="w-3/4 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Artists</span>
                          <span className="text-sm font-medium">+8% this month</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="w-1/2 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">Revenue</span>
                          <span className="text-sm font-medium">+22% this month</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="w-5/6 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};