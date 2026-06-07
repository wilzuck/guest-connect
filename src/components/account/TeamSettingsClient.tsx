// components/account/TeamSettingsClient.tsx
"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button"; // suppose que tu as ce composant

interface TeamMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  online?: boolean;
}

const teams = [
  { name: "Rareblocks", membersCount: 3, avatarColor: "bg-violet-600", avatarText: "R" },
  { name: "Astrona", membersCount: 12, avatarColor: "bg-teal-500", avatarText: "A" },
];

const teamMembers: TeamMember[] = [
  { id: "1", name: "Arlene McCoy", username: "@arlene_mc", avatar: "https://i.pravatar.cc/48?u=arlene", online: true },
  { id: "2", name: "Darrell Steward", username: "@darrellsteward", avatar: "https://i.pravatar.cc/48?u=darrell" },
  { id: "3", name: "Marvin McKinney", username: "@marvinmc", avatar: "https://i.pravatar.cc/48?u=marvin", online: true },
  { id: "4", name: "Floyd Miles", username: "@floydmiles", avatar: "https://i.pravatar.cc/48?u=floyd" },
  { id: "5", name: "Albert Flores", username: "@albertfl", avatar: "https://i.pravatar.cc/48?u=albert" },
];

export default function TeamSettingsClient({ isEn }: { isEn: boolean }) {
  return (
    <div className="space-y-8">
      {/* Teams you are on */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{isEn ? "Teams you are on" : "Vos équipes"}</h3>
            <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Join Another Team</Button>
        </div>

        <div className="space-y-4">
          {teams.map((team, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-none">
              <div className="flex items-center gap-3">
                <div className={`grid h-9 w-9 place-items-center rounded-xl text-white text-sm font-semibold ${team.avatarColor}`}>
                  {team.avatarText}
                </div>
                <div>
                  <p className="font-medium">{team.name}</p>
                  <p className="text-sm text-zinc-500">{team.membersCount} members</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Leave
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Team Members */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Team Members</h3>
            <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Add New Member</Button>
        </div>

        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between py-3 border-b last:border-none group">
              <div className="flex items-center gap-3">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.name}</p>
                    {member.online && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                  </div>
                  <p className="text-sm text-zinc-500">{member.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                  Remove
                </Button>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
