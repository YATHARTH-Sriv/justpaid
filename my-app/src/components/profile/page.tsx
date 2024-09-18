import { Avatar,AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, CameraIcon, EnvelopeClosedIcon, GearIcon, PersonIcon} from "@radix-ui/react-icons"

export default function Component({ username, email }:{username: string, email?: string}) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="user" />
            {/* <AvatarFallback>{username.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback> */}
          </Avatar>
          <div className="grid gap-1">
            <CardTitle className="text-2xl font-bold">Welcome, {username}!</CardTitle>
            <p className="text-gray-500">Manage your account settings and preferences.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="flex items-center space-x-2">
            <PersonIcon className="w-4 h-4 text-gray-500" />
            <Input id="username" value={username} readOnly />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center space-x-2">
            <EnvelopeClosedIcon className="w-4 h-4 text-gray-500" />
            <Input id="email" type="email" value={email} readOnly />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <Input id="dob" type="date" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="avatar-upload">Profile Picture</Label>
          <div className="flex items-center space-x-2">
            <Input id="avatar-upload" type="file" accept="image/*" className="hidden" />
            <Button asChild>
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <CameraIcon className="w-4 h-4 mr-2" />
                Upload New Avatar
              </label>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>
            <GearIcon className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}