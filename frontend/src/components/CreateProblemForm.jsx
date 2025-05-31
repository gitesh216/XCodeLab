import React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Plus, 
    Trash2,
    Code2,
    FileText,
    Lightbulb,
    BookOpen,
    CheckCircle2,
    Download
} from 'lucide-react'
import Editor from "@monaco-editor/react"
import { useState } from 'react'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function CreateProblemForm() {
  return (
    <div>CreateProblemForm</div>
  )
}

export default CreateProblemForm