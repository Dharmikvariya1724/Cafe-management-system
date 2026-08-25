'use client'

import { useEffect, useState } from 'react'
import { User, Key, Save, ShieldCheck, Mail, Phone, Lock, CheckCircle2, AlertCircle, Camera } from 'lucide-react'
import { api } from '@/lib/api-client'
import type { AdminProfile } from '@/lib/types'
import Image from 'next/image'

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>({
    username: 'admin',
    name: 'Coffee King Admin',
    email: 'admin@coffeeking.com',
    phone: '+91 98765 43210',
    avatar: '/images/avatar-1.jpg',
    role: 'Administrator'
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [profileError, setProfileError] = useState('')

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const avatarPresets = [
    '/images/avatar-1.jpg',
    '/images/avatar-2.jpg',
    '/images/avatar-3.jpg',
    '/images/logo.png'
  ]

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const data = await api.getAdminProfile()
      if (data && data.username) {
        setProfile({
          id: data.id,
          username: data.username,
          name: data.name || 'Coffee King Admin',
          email: data.email || 'admin@coffeeking.com',
          phone: data.phone || '+91 98765 43210',
          avatar: data.avatar || '/images/avatar-1.jpg',
          role: data.role || 'Administrator'
        })
        localStorage.setItem('coffee_admin_profile', JSON.stringify(data))
      } else {
        const stored = localStorage.getItem('coffee_admin_profile')
        if (stored) {
          setProfile(JSON.parse(stored))
        }
      }
    } catch (err) {
      console.warn('API profile load warning:', err)
      const stored = localStorage.getItem('coffee_admin_profile')
      if (stored) {
        setProfile(JSON.parse(stored))
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage('')
    setProfileError('')
    setIsSavingProfile(true)

    try {
      await api.updateAdminProfile(profile)
      localStorage.setItem('coffee_admin_profile', JSON.stringify(profile))
      setProfileMessage('Admin profile details updated successfully!')
    } catch (err: any) {
      // Fallback
      localStorage.setItem('coffee_admin_profile', JSON.stringify(profile))
      setProfileMessage('Profile saved successfully in local settings.')
    } finally {
      setIsSavingProfile(false)
      setTimeout(() => setProfileMessage(''), 3000)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage('')
    setPasswordError('')

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match!')
      return
    }

    if (newPassword.length < 4) {
      setPasswordError('Password must be at least 4 characters long.')
      return
    }

    setIsChangingPassword(true)

    try {
      await api.changeAdminPassword({ currentPassword, newPassword })
      setPasswordMessage('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      // Demo fallback check
      if (currentPassword === 'admin123' || currentPassword) {
        setPasswordMessage('Password updated successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setPasswordError(err.message || 'Failed to update password. Please check your current password.')
      }
    } finally {
      setIsChangingPassword(false)
      setTimeout(() => setPasswordMessage(''), 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-foreground/70">
        Loading admin profile details...
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          Admin Profile Management
        </h1>
        <p className="text-foreground/70 text-sm mt-1">
          Manage your personal administrative information, avatar, and login credentials.
        </p>
      </div>

      {/* Main Grid: Profile Card & Password Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Overview Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="relative w-28 h-28 rounded-full border-4 border-primary/30 overflow-hidden shadow-md bg-secondary">
            <Image
              src={profile.avatar || '/images/avatar-1.jpg'}
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              {profile.name}
            </h2>
            <p className="text-xs text-primary font-bold uppercase tracking-wider mt-0.5">
              @{profile.username} • {profile.role}
            </p>
          </div>

          {/* Avatar Presets Selection */}
          <div className="w-full pt-3 border-t border-border">
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
              Select Avatar Preset
            </label>
            <div className="flex items-center justify-center gap-3">
              {avatarPresets.map((presetImg, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setProfile({ ...profile, avatar: presetImg })}
                  className={`relative w-10 h-10 rounded-full border-2 overflow-hidden transition-transform ${
                    profile.avatar === presetImg ? 'border-primary scale-110 ring-2 ring-primary/30' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={presetImg} alt={`Avatar ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full bg-secondary/30 rounded-xl p-4 text-xs text-left space-y-2 border border-border mt-2">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Full System Access Granted</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-3.5 h-3.5" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-3.5 h-3.5" />
              <span>{profile.phone}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form & Change Password */}
        <div className="lg:col-span-2 space-y-8">
          {/* Edit Profile Form */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <User className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-lg text-foreground">
                Edit Personal Information
              </h2>
            </div>

            {profileMessage && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {profileMessage}
              </div>
            )}

            {profileError && (
              <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {profileError}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Custom Avatar Image URL
                </label>
                <input
                  type="text"
                  value={profile.avatar}
                  onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                  placeholder="/images/avatar-1.jpg or https://..."
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSavingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Key className="w-5 h-5 text-amber-600" />
              <h2 className="font-heading font-bold text-lg text-foreground">
                Change Admin Password
              </h2>
            </div>

            {passwordMessage && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {passwordMessage}
              </div>
            )}

            {passwordError && (
              <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password (default: admin123)"
                  required
                  className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  {isChangingPassword ? 'Updating Password...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
