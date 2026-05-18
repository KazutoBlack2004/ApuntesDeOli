import { Card } from "@heroui/react";

export default function ConceptosUnity() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Conceptos Básicos de Unity</h1>
        <p className="text-white/60 text-lg">Un resumen de los componentes principales para el desarrollo en Unity.</p>
      </div>

      <div className="my-2 h-px bg-white/10 w-full" />

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-white/5 border border-white/10" shadow="sm">
          <Card.Header className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md font-bold">GameObjects</p>
              <p className="text-small text-default-500">La entidad fundamental</p>
            </div>
            </Card.Header>
          <div className="h-px bg-white/10 w-full" />
          <Card.Content>
            <p className="text-white/80 leading-relaxed">
              Todo en tu juego es un GameObject, desde los personajes y luces hasta las cámaras y efectos especiales. Sin embargo, un GameObject por sí solo no hace nada; necesita <strong>Componentes</strong> para darle propiedades y comportamientos.
            </p>
          </Card.Content>
        </Card>

        <Card className="bg-white/5 border border-white/10" shadow="sm">
          <Card.Header className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md font-bold">MonoBehaviour</p>
              <p className="text-small text-default-500">Scripting en C#</p>
            </div>
            </Card.Header>
          <div className="h-px bg-white/10 w-full" />
          <Card.Content>
            <p className="text-white/80 leading-relaxed">
              La clase base de la cual derivan todos los scripts de Unity. Proporciona métodos de ciclo de vida esenciales como <code>Start()</code>, <code>Update()</code> y <code>FixedUpdate()</code>.
            </p>
            <div className="mt-4 bg-black/50 p-4 rounded-lg font-mono text-sm border border-white/10 overflow-x-auto">
              <pre>
<span className="text-blue-400">using</span> UnityEngine;{'\n\n'}
<span className="text-blue-400">public</span> <span className="text-blue-400">class</span> <span className="text-emerald-400">PlayerController</span> : <span className="text-emerald-400">MonoBehaviour</span> {'{'}{'\n'}
{'    '}<span className="text-blue-400">void</span> <span className="text-yellow-200">Start</span>() {'{'}{'\n'}
{'        '}<span className="text-green-400">// Inicialización</span>{'\n'}
{'    '}{'}'}{'\n\n'}
{'    '}<span className="text-blue-400">void</span> <span className="text-yellow-200">Update</span>() {'{'}{'\n'}
{'        '}<span className="text-green-400">// Lógica por frame</span>{'\n'}
{'    '}{'}'}{'\n'}
{'}'}
              </pre>
            </div>
          </Card.Content>
        </Card>

        <Card className="bg-white/5 border border-white/10" shadow="sm">
          <Card.Header className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md font-bold">Prefabs</p>
              <p className="text-small text-default-500">Reusabilidad</p>
            </div>
            </Card.Header>
          <div className="h-px bg-white/10 w-full" />
          <Card.Content>
            <p className="text-white/80 leading-relaxed">
              El sistema de Prefabs te permite crear, configurar y almacenar un GameObject completo con todos sus componentes, valores de propiedades y GameObjects hijos como un Asset reutilizable.
            </p>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
