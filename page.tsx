'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VoiceSynthesis() {
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('en-US-Wavenet-D')
  const [audioUrl, setAudioUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voice }),
    })
    const data = await response.json()
    setAudioUrl(data.audioUrl)
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="text">テキスト</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="合成したいテキストを入力してください"
          />
        </div>
        <div>
          <Label htmlFor="voice">音声</Label>
          <Select onValueChange={setVoice} defaultValue={voice}>
            <SelectTrigger>
              <SelectValue placeholder="音声を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US-Wavenet-D">英語 (男性)</SelectItem>
              <SelectItem value="en-US-Wavenet-C">英語 (女性)</SelectItem>
              <SelectItem value="ja-JP-Wavenet-B">日本語 (男性)</SelectItem>
              <SelectItem value="ja-JP-Wavenet-A">日本語 (女性)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">音声を生成</Button>
      </form>
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl}>
            お使いのブラウザは音声要素をサポートしていません。
          </audio>
        </div>
      )}
    </div>
  )
}
